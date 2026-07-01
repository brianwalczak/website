import React, { useEffect, useState, useCallback } from "react";
import { MAX_PRINTER_CHARS } from "@/lib/constants";
const FADE_DURATION = 150;

function PrinterModal({ onClose }: { onClose: () => void }) {
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

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

			try {
				const req = await fetch("/api/print", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ message }),
				});

				const res = await req.json();

				if (!res.success || res.error) {
					alert(res.error || "An error occurred while sending your message to the printer.");
				} else {
					alert("Your message has been sent to the printer! It should print within around 30 seconds (or whenever my computer is turned on).");
				}
			} catch {
				alert("An unknown error occurred while sending your message to the printer.");
			} finally {
				setLoading(false);
				handleClose();
			}
		},
		[message, handleClose],
	);

	const charsLeft = MAX_PRINTER_CHARS - message.length;
	const isNearLimit = charsLeft <= 15;
	const isAtLimit = charsLeft === 0;

	return (
		<div className={`fixed inset-0 bg-backdrop/80 backdrop-blur-sm flex items-center justify-center z-60 transition-opacity duration-${FADE_DURATION} ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={handleClickAway}>
			<div className={`bg-surface rounded-2xl shadow-lg max-w-[31rem] w-full mx-4 p-6 pb-4 border border-surface-border transition-all duration-${FADE_DURATION} ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
				<div className="flex items-start justify-between mb-1">
					<div className="flex items-center gap-3">
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 576 512" strokeWidth={2} stroke="currentColor" className="mx-1 size-6.5 text-header shrink-0">
							<path d="M290.5 287.7L491.4 86.9 359 456.3 290.5 287.7zM457.4 53L256.6 253.8 88 185.3 457.4 53zM38.1 216.8l205.8 83.6 83.6 205.8c5.3 13.1 18.1 21.7 32.3 21.7 14.7 0 27.8-9.2 32.8-23.1L570.6 8c3.5-9.8 1-20.6-6.3-28s-18.2-9.8-28-6.3L39.4 151.7c-13.9 5-23.1 18.1-23.1 32.8 0 14.2 8.6 27 21.7 32.3z" />
						</svg>

						<div>
							<h2 className="text-lg font-semibold text-header">Send to my Printer</h2>
							<p className="text-sm leading-snug mt-0.5">Your message will print as a sticker label on my desk!</p>
						</div>
					</div>

					<button onClick={handleClose} className="cursor-pointer size-8 flex items-center justify-center rounded-lg border border-transparent hover:bg-surface-hover hover:border-surface-border transition hover:text-header shrink-0 ml-2">
						<svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<form onSubmit={handleSubmit} className="mt-5">
					<div className="mb-4">
						<label className="block text-sm font-medium mb-2">Message</label>
						<input type="text" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={MAX_PRINTER_CHARS} placeholder="Enter a message (something cool!)..." className="w-full px-4 py-2.5 font-normal bg-surface-hover border border-surface-border rounded-xl focus:border-purple-500/50 outline-none transition text-header placeholder-text-disabled" disabled={loading} required />

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
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4.5 mr-[-2px]">
										<path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
									</svg>
									Print it!
								</>
							)}
						</button>
					</div>

					<p className="text-xs leading-relaxed text-center">Max {MAX_PRINTER_CHARS} characters. It can take around 30 seconds to print after submission!</p>
				</form>
			</div>
		</div>
	);
}

export default PrinterModal;
