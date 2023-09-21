"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var surveyTemplate = function (body) {
    return "\n  <html>\n    <body>\n      <div style=\"text-align: center;\">\n        <h3>We'd like your feedback</h3>\n        <p>Please answer the following question:</p>\n        <p>".concat(body, "</p>\n        <div>\n          <a href=\"http://localhost:3000\">Yes</a>\n          <a href=\"http://localhost:3000\">No</a>\n        </div>\n      </div>\n    </body>\n  </html>\n  ");
};
exports.default = surveyTemplate;
