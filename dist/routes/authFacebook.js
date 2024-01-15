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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
const APP_ID = "2051688431877006";
const APP_SECRET = "71a06e9c3fc15ccfa96dfdd693351e0f";
const REDIRECT_URI = "http://localhost:5555/api/auth/facebook/callback";
router.get("/auth/facebook", (req, res) => {
    const url = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email`;
    res.redirect(url);
});
router.get("/auth/facebook/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    try {
        // https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow/
        // Exchange authorization code for access token
        const { data } = yield axios_1.default.get(`https://graph.facebook.com/v18.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`);
        const { access_token } = data;
        // Use access_token to fetch user profile
        const { data: profile } = yield axios_1.default.get(`https://graph.facebook.com/v18.0/me?fields=name,email,picture&access_token=${access_token}`);
        // Code to handle user authentication and retrieval using the profile data
        console.log(profile);
        res.redirect("/");
    }
    catch (error) {
        console.error("Error:", error);
        res.redirect("/login");
    }
}));
exports.default = router;
