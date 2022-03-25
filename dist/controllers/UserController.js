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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.logIn = exports.signUp = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var encrypt_1 = require("../utils/encrypt");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//CRUD
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, typeorm_1.getRepository)(User_1.User).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, typeorm_1.getRepository)(User_1.User).findOne(req.params.id)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
exports.getUser = getUser;
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newUser = (0, typeorm_1.getRepository)(User_1.User).create(req.body);
                return [4 /*yield*/, (0, typeorm_1.getRepository)(User_1.User).save(newUser)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, typeorm_1.getRepository)(User_1.User).findOne(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                (0, typeorm_1.getRepository)(User_1.User).merge(user, req.body);
                return [4 /*yield*/, (0, typeorm_1.getRepository)(User_1.User).save(user)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 3: return [2 /*return*/, res.status(404).json({ msg: 'Not user found' })];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, typeorm_1.getRepository)(User_1.User).delete(req.params.id)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
exports.deleteUser = deleteUser;
//----------------------------------------------------------------------------------------------------
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, newUser, results, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, typeorm_1.getConnection)()
                    .getRepository(User_1.User)
                    .createQueryBuilder("User")
                    .where("User.email = :User_email", { User_email: req.body.email })
                    .getOne()];
            case 1:
                user = _b.sent();
                if (!!user) return [3 /*break*/, 4];
                //Encriptando la contraseña
                _a = req.body;
                return [4 /*yield*/, (0, encrypt_1.encryptPassword)(req.body.password)];
            case 2:
                //Encriptando la contraseña
                _a.password = _b.sent();
                newUser = (0, typeorm_1.getRepository)(User_1.User).create(req.body);
                return [4 /*yield*/, (0, typeorm_1.getRepository)(User_1.User).save(newUser)];
            case 3:
                results = _b.sent();
                token = jsonwebtoken_1.default.sign({ _id: req.body.password }, process.env.TOKEN_SECRET || 'tokentest');
                return [2 /*return*/, res.header('Token', token).json(results)];
            case 4: return [2 /*return*/, res.status(404).json({ msg: 'User already exist' })];
        }
    });
}); };
exports.signUp = signUp;
var logIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, esValida, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, typeorm_1.getConnection)()
                    .getRepository(User_1.User)
                    .createQueryBuilder("User")
                    .where("User.email = :User_email", { User_email: req.body.email })
                    .getOne()];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, encrypt_1.validatePassword)(req.body.password, user.password)];
            case 2:
                esValida = _a.sent();
                if (!esValida) {
                    return [2 /*return*/, res.status(404).json({ msg: 'Invalid password' })];
                }
                token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.TOKEN_SECRET || 'tokentest', {
                    expiresIn: 60 * 60
                });
                return [2 /*return*/, res.header('auth-token', token).json(user)];
            case 3: return [2 /*return*/, res.status(404).json({ msg: 'Email or password is wrong' })];
        }
    });
}); };
exports.logIn = logIn;
var profile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, typeorm_1.getRepository)(User_1.User).findOne(req.userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json("No user found")];
                }
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
exports.profile = profile;
