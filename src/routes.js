const {
	addNoteHandler,
	getAllNotesHandler,
	getNoteByIdHandler,
	editNoteByIdHandler,
	deleteNoteByIdHandler,
} = require("./handler");

const {
	addBookHandler,
	getAllBooksHandler,
	getBookByIdHandler,
	editBookByIdHandler,
	deletedBookByIdHandler,
} = require("./bookHandler");

const Joi = require("joi");

const routes = [
	{
		method: "POST",
		path: "/notes",
		handler: addNoteHandler,
	},
	{
		method: "GET",
		path: "/notes",
		handler: getAllNotesHandler,
	},
	{
		method: "GET",
		path: "/notes/{id}",
		handler: getNoteByIdHandler,
	},
	{
		method: "PUT",
		path: "/notes/{id}",
		handler: editNoteByIdHandler,
	},
	{
		method: "DELETE",
		path: "/notes/{id}",
		handler: deleteNoteByIdHandler,
	},
	{
		method: "POST",
		path: "/books",
		handler: addBookHandler,
		options: {
			validate: {
				payload: Joi.object({
					name: Joi.string(),
					year: Joi.number().integer(),
					author: Joi.string(),
					summary: Joi.string(),
					publisher: Joi.string(),
					pageCount: Joi.number().integer(),
					readPage: Joi.number().integer(),
					reading: Joi.boolean(),
				}),
			},
		},
	},
	{
		method: "GET",
		path: "/books",
		handler: getAllBooksHandler,
		options: {
			validate: {
				query: Joi.object({
					name: Joi.string(),
					reading: Joi.number().integer().min(0).max(1),
					finished: Joi.number().integer().min(0).max(1),
				}),
			},
		},
	},
	{
		method: "GET",
		path: "/books/{id}",
		handler: getBookByIdHandler,
	},
	{
		method: "PUT",
		path: "/books/{id}",
		handler: editBookByIdHandler,
		options: {
			validate: {
				payload: Joi.object({
					name: Joi.string(),
					year: Joi.number().integer(),
					author: Joi.string(),
					summary: Joi.string(),
					publisher: Joi.string(),
					pageCount: Joi.number().integer(),
					readPage: Joi.number().integer(),
					reading: Joi.boolean(),
				}),
			},
		},
	},
	{
		method: "DELETE",
		path: "/books/{id}",
		handler: deletedBookByIdHandler,
	},
];

module.exports = routes;
