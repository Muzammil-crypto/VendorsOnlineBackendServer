import { useEffect } from 'react';

const TermsOfUse = () => {
  useEffect(() => {
    (function (d, s, id) {
      var js,
        tjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://app.termly.io/embed-policy.min.js';
      tjs.parentNode.insertBefore(js, tjs);
    })(document, 'script', 'termly-jssdk');
  }, []);

  return (
    <div
      name="termly-embed"
      data-id="4eb012bf-72a3-4f7f-9be4-f79049248642"
      data-type="iframe"
    ></div>
  );
};

export default TermsOfUse;
