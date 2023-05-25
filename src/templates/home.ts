export const Home = ({
  trackingUrl,
  ackeeDomainId,
}: {
  trackingUrl: string;
  ackeeDomainId: string;
}) => {
  return `<body>
  <div class='panel'></div>
    <script async 
      src="${trackingUrl}" 
      data-ackee-server="${trackingUrl}" 
      data-ackee-domain-id=
      "${ackeeDomainId}">
    </script>
    <script async src="${"../lib/matrix"}"
    </script>
  </body>`;
};
