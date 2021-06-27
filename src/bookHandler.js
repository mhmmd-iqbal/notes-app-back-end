const books = require("./books");
const { nanoid } = require("nanoid");

const addBookHandler = (request, h) => {
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = request.payload;
	const id = nanoid(16);
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;

	if (typeof name === "undefined") {
		const response = h.response({
			status: "fail",
			message: "Gagal menambahkan buku. Mohon isi nama buku",
		});

		response.code(400);
		return response;
	}

	if (readPage > pageCount) {
		const response = h.response({
			status: "fail",
			message:
				"Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
		});

		response.code(400);
		return response;
	}

	const booleanFinished = readPage === pageCount ? true : false;

	const newBook = {
		id,
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
		finished: booleanFinished,
		insertedAt,
		updatedAt,
	};
	books.push(newBook);

	const isSuccess = books.filter((book) => book.id === id).length > 0;

	if (isSuccess) {
		const response = h.response({
			status: "success",
			message: "Buku berhasil ditambahkan",
			data: {
				bookId: id,
			},
		});

		response.code(201);
		return response;
	}
	const response = h.response({
		status: "fail",
		message: "Catatan gagal ditambahkan",
	});
	response.code(500);
	return response;
};

const getAllBooksHandler = (request, h) => {
	const { name, reading, finished } = request.query;
	let filterBook;
	let newBooks;
	if (
		typeof name !== "undefined" ||
		typeof reading !== "undefined" ||
		typeof finished !== "undefined"
	) {
		if (typeof name !== "undefined") {
			filterBook = books.filter(
				(book) => book.name.toLowerCase().indexOf(name.toLowerCase()) >= 0
			);
		}
		if (typeof reading !== "undefined") {
			filterBook = books.filter((book) => book.reading == reading);
		}
		if (typeof finished !== "undefined") {
			filterBook = books.filter((book) => book.finished == finished);
		}
		newBooks = filterBook.map((book) => {
			return {
				id: book.id,
				name: book.name,
				publisher: book.publisher,
			};
		});
	} else {
		newBooks = books.map((book) => {
			return {
				id: book.id,
				name: book.name,
				publisher: book.publisher,
			};
		});
	}

	const response = h.response({
		status: "success",
		data: {
			books: newBooks,
		},
	});

	response.code(200);
	return response;
};

const getBookByIdHandler = (request, h) => {
	const { id } = request.params;

	const book = books.filter((n) => n.id === id)[0];

	if (book !== undefined) {
		return {
			status: "success",
			data: {
				book,
			},
		};
	}
	const response = h.response({
		status: "fail",
		message: "Buku tidak ditemukan",
	});
	response.code(404);
	return response;
};

const editBookByIdHandler = (request, h) => {
	const { id } = request.params;

	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = request.payload;
	const updatedAt = new Date().toISOString();

	if (typeof name === "undefined") {
		const response = h.response({
			status: "fail",
			message: "Gagal memperbarui buku. Mohon isi nama buku",
		});

		response.code(400);
		return response;
	}

	if (readPage > pageCount) {
		const response = h.response({
			status: "fail",
			message:
				"Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
		});

		response.code(400);
		return response;
	}

	const index = books.findIndex((book) => book.id === id);

	const booleanFinished = readPage === pageCount ? true : false;

	if (index !== -1) {
		books[index] = {
			...books[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			reading,
			finished: booleanFinished,
			updatedAt,
		};

		const response = h.response({
			status: "success",
			message: "Buku berhasil diperbarui",
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: "fail",
		message: "Gagal memperbarui buku. Id tidak ditemukan",
	});
	response.code(404);
	return response;
};

const deletedBookByIdHandler = (request, h) => {
	const { id } = request.params;

	const index = books.findIndex((book) => book.id === id);

	if (index !== -1) {
		books.splice(index, 1);
		const response = h.response({
			status: "success",
			message: "Buku berhasil dihapus",
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: "fail",
		message: "Buku gagal dihapus. Id tidak ditemukan",
	});
	response.code(404);
	return response;
};

module.exports = {
	addBookHandler,
	getAllBooksHandler,
	getBookByIdHandler,
	editBookByIdHandler,
	deletedBookByIdHandler,
};
