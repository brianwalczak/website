"use client";

import { useState } from "react";
import PrinterModal from "@/components/PrinterModal";

import Printer from "@/components/icons/Printer";
import ArrowRight from "@/components/icons/ArrowRight";

export default function PrinterSection() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<section className="mt-6">
				<button onClick={() => setShowModal(true)} className="group w-full text-left border border-surface-border bg-surface hover:bg-surface-hover hover:border-purple-500/40 rounded-xl p-5 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:outline-none">
					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-3 min-w-0">
							<Printer className="size-7 shrink-0 text-purple-400 ml-1 mr-1.5" />

							<div className="min-w-0">
								<h2 className="text-purple-400 text-[0.9375rem] sm:text-base mb-0.5">My Printer</h2>
								<p className="group-hover:text-text-hover text-sm sm:text-[0.9375rem] transition-colors duration-200">Send me a message and it&apos;ll physically print as a sticker on my desk!</p>
							</div>
						</div>

						<ArrowRight className="size-4 group-hover:text-purple-400 shrink-0" />
					</div>
				</button>
			</section>

			{showModal && <PrinterModal onClose={() => setShowModal(false)} />}
		</>
	);
}
