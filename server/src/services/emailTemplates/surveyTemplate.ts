import { HydratedDocument } from "mongoose";
import keys from "../../config/keys";
import { SurveySaveType } from "../../models/Survey";

const surveyTemplate = (survey: HydratedDocument<SurveySaveType>): string => {
  return `
  <html>
    <body>
      <div style="text-align: center;">
        <h3>We'd like your feedback</h3>
        <p>Please answer the following question:</p>
        <p>${survey.body}</p>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
        </div>
      </div>
    </body>
  </html>
  `;
};

export default surveyTemplate;
