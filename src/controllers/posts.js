"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setter = exports.getter = void 0;
const posts_1 = require("../models/posts");
function getter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { type } = req.params;
        if (!/^(infos|virus)$/i.test(type))
            res.status(404).json({ message: "Not found" });
        try {
            let query;
            if (type === 'infos') {
                query = yield posts_1.InfosSchema.find();
            }
            else
                query = yield posts_1.VirusSchema.find();
            res.status(200).json(query);
        }
        catch (error) {
            res.status(500).json({ message: "An unknow error has been encountered by the server." });
        }
    });
}
exports.getter = getter;
;
function setter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { type } = req.params;
        if (!/^(infos|virus)$/i.test(type))
            res.status(404).json({ message: "Not found" });
        const schema = type === 'infos' ? posts_1.InfosSchema : posts_1.VirusSchema;
        try {
            const newPost = new schema(req.body);
            yield newPost.save();
            res.status(201).json({ message: "Content successfully added." });
        }
        catch (error) {
            res.status(500).json({ message: "An unknow error has been encountered by the server." });
        }
    });
}
exports.setter = setter;
;
