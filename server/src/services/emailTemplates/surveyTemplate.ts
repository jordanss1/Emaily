import keys from "../../config/keys";

const surveyTemplate = (body: string): string => {
  return `
  <html>
    <body>
      <div style="text-align: center;">
        <h3>We'd like your feedback</h3>
        <p>Please answer the following question:</p>
        <p>${body}</p>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
          <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
        </div>
      </div>
    </body>
  </html>
  `;
};

export default surveyTemplate;
