"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = __importDefault(require("../../config/keys"));
const surveyTemplate = (body) => {
    return `
  <html>
    <body>
      <div style="text-align: center;">
        <h3>We'd like your feedback</h3>
        <p>Please answer the following question:</p>
        <p>${body}</p>
        <div>
          <a href="${keys_1.default.redirectDomain}/api/surveys/thanks">Yes</a>
          <a href="${keys_1.default.redirectDomain}/api/surveys/thanks">No</a>
        </div>
      </div>
    </body>
  </html>
  `;
};
exports.default = surveyTemplate;
