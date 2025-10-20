type PaginationProps = {
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	numberOfPages: number;
};

const Pagination = ({
	currentPage,
	setCurrentPage,
	numberOfPages,
}: PaginationProps) => {
	const handlePrevBtn = () => {
		if (currentPage >= 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextBtn = () => {
		if (currentPage < numberOfPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<div className=" flex flex-row items-center justify-center gap-10 mt-10">
			{/* prev btn */}
			<button
				className={` prevNextBtn ${currentPage === 1 ? "hidden" : ""}`}
				id="prevBtn"
				onClick={handlePrevBtn}
				disabled={currentPage === 1}
			>
				previous
			</button>

			<div className="pageNumGrp">
				{Array.from({ length: numberOfPages }, (_, index) => (
					<div
						className={`pageNum ${
							currentPage === index + 1
								? " text-white bg-orange-400 w-14"
								: " bg-slate-300 w-6"
						}`}
						key={index}
					>
						{/* {index + 1} */}
					</div>
				))}
			</div>

			{/* next btn */}
			<button
				className={` prevNextBtn ${
					currentPage === numberOfPages ? "hidden" : ""
				}`}
				id="nextBtn"
				onClick={handleNextBtn}
				disabled={currentPage === numberOfPages}
			>
				next
			</button>
		</div>
	);
};

export default Pagination;
