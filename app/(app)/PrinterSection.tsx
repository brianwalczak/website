"use client";

import { useState } from "react";
import PrinterModal from "@/components/PrinterModal";

export default function PrinterSection() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<section className="mt-6">
				<button onClick={() => setShowModal(true)} className="group w-full text-left border border-surface-border bg-surface hover:bg-surface-hover hover:border-purple-500/40 rounded-xl p-5 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:outline-none">
					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-3 min-w-0">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-7 shrink-0 text-purple-400 ml-1 mr-1.5">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
							</svg>

							<div className="min-w-0">
								<h2 className="text-purple-400 text-[0.9375rem] sm:text-base mb-0.5">My Printer</h2>
								<p className="group-hover:text-text-hover text-sm sm:text-[0.9375rem] transition-colors duration-200">Send me a message and it&apos;ll physically print as a sticker on my desk!</p>
							</div>
						</div>

						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 group-hover:text-purple-400 shrink-0">
							<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
						</svg>
					</div>
				</button>
			</section>

			{showModal && <PrinterModal onClose={() => setShowModal(false)} />}
		</>
	);
}
