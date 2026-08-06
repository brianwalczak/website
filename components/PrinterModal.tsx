import React, { useEffect, useState, useCallback } from "react";
import { MAX_PRINTER_CHARS } from "@/lib/constants";

import PaperAirplane from "@/components/icons/PaperAirplane";
import Printer from "@/components/icons/Printer";
import X from "@/components/icons/X";

const FADE_DURATION = 150;

function PrinterModal({ onClose }: { onClose: () => void }) {
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState<{ type: "success" | "error" | "pending"; text: string } | null>(null);

	const handleClose = useCallback(() => {
		setVisible(false);
		if (onClose) setTimeout(onClose, FADE_DURATION);
	}, [onClose]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape") {
				handleClose();
			}
		},
		[handleClose],
	);

	useEffect(() => {
		const id = requestAnimationFrame(() => setVisible(true));
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			cancelAnimationFrame(id);
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	const handleClickAway = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	};

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setLoading(true);
			setStatus({ type: "pending", text: "Your message is on its way to the printer. Just a moment!" });

			try {
				const req = await fetch("/api/print", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ message }),
				});

				const res = await req.json();

				if (!res.success || res.error) {
					setStatus({ type: "error", text: res.error || "An error occurred while sending your message to the printer." });
				} else {
					setStatus({ type: "success", text: "Sent! Your message will print within ~30s (whenever my computer's on)." });
					setMessage("");
				}
			} catch {
				setStatus({ type: "error", text: "An unknown error occurred while sending your message to the printer." });
			} finally {
				setLoading(false);
			}
		},
		[message],
	);

	const charsLeft = MAX_PRINTER_CHARS - message.length;
	const isNearLimit = charsLeft <= 15;
	const isAtLimit = charsLeft === 0;

	return (
		<div className={`fixed inset-0 bg-backdrop/80 backdrop-blur-sm flex items-center justify-center z-60 transition-opacity duration-${FADE_DURATION} ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={handleClickAway}>
			<div className={`bg-surface rounded-2xl shadow-lg max-w-[31rem] w-full mx-4 p-6 pb-4 border border-surface-border transition-all duration-${FADE_DURATION} ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
				<div className="flex items-start justify-between mb-1">
					<div className="flex items-center gap-3">
						<PaperAirplane className="mx-1 size-6.5 text-header shrink-0" />

						<div>
							<h2 className="text-lg font-semibold text-header">Send to my Printer</h2>
							<p className="text-sm leading-snug mt-0.5">Your message will print as a sticker label on my desk!</p>
						</div>
					</div>

					<button onClick={handleClose} className="cursor-pointer size-8 flex items-center justify-center rounded-lg border border-transparent hover:bg-surface-hover hover:border-surface-border transition hover:text-header shrink-0 ml-2">
						<X className="size-4" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="mt-5">
					<div className="mb-4">
						<label className="block text-sm font-medium mb-2">Message</label>
						<input
							type="text"
							value={message}
							onChange={(e) => {
								setMessage(e.target.value);
								setStatus(null);
							}}
							maxLength={MAX_PRINTER_CHARS}
							placeholder="Enter a message (something cool!)..."
							className="w-full px-4 py-2.5 font-normal bg-surface-hover border border-surface-border rounded-xl focus:border-purple-500/50 outline-none transition text-header placeholder-text-disabled"
							disabled={loading}
							required
						/>

						<div className="flex justify-end mt-1.5 mr-2">
							<span className={`text-xs tabular-nums transition-colors duration-150 ${isAtLimit ? "text-red-400" : isNearLimit ? "text-amber-400" : ""}`}>
								{charsLeft} / {MAX_PRINTER_CHARS}
							</span>
						</div>
					</div>

					<div className="flex items-center mb-3">
						<button type="submit" className="flex-1 px-4 py-2.5 cursor-pointer bg-purple-700 hover:bg-purple-600 disabled:bg-surface-hover border border-transparent disabled:border-surface-border text-white rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" disabled={!message.trim() || loading}>
							{loading ? (
								<>
									{/* loading spinner! */}
									<div className="size-4.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-[-1px]"></div>
									Sending to printer...
								</>
							) : (
								<>
									{/* printer icon! */}
									<Printer className="size-4.5 mr-[-2px]" strokeWidth={2.5} />
									Print it!
								</>
							)}
						</button>
					</div>

					{status ? <p className={`text-xs leading-relaxed text-center ${status.type === "success" ? "text-green-500" : status.type === "error" ? "text-red-400" : ""}`}>{status.text}</p> : <p className="text-xs leading-relaxed text-center">Max {MAX_PRINTER_CHARS} characters. It can take around 30 seconds to print after submission!</p>}
				</form>
			</div>
		</div>
	);
}

export default PrinterModal;
