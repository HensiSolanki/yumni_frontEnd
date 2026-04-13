// const getEnvironment = () => {
//     switch (process.env.NEXT_PUBLIC_PROJECT_ENV) {
//       case "production":
//         return "production";
//       case "staging":
//         return "staging";
//       case "development":
//         return "development";
//       default:
//         return "development";
//     }
//   };
  
//   const getAPIUrl = () => {
//     switch (process.env.NEXT_PUBLIC_PROJECT_ENV) {
//       case "production":
//         return "https://api.fetisher.co/api/v1";
//       case "staging":
//         return "https://fetisher-dev.dryrun.click/api/v1"; // add new url for stagging
//       case "development":
//         return "https://fetisher-dev.dryrun.click/api/v1";
//       // return "http://localhost:8000/api/v1";
//       default:
//         return "https://api.fetisher.co/api/v1";
//     }
//   };