export const msalConfig = {
  auth: {
    clientId: "<application-id>", // replace this with the application id copied from Azure dashborad
    authority: "https://login.microsoftonline.com/consumers",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// permissions list
export const loginRequest = {
  scopes: ["User.Read", "Calendars.Read", "Calendars.Read.Shared"],
};

export const graphConfig = {
  calenderEndpoint:
    "https://graph.microsoft.com/v1.0/me/events?$select=subject,bodyPreview,organizer,attendees,start,end,isAllDay,categories,subject",
};

// read information from MS Graph endpoint
export async function callMsGraph(endpoint: string, accessToken: string) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(endpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

// format Outlook events to Bryntum model
export function formatEvents(item: { [key: string]: any }) {
  return {
    id: item.id,
    startDate: item.start.dateTime,
    endDate: item.end.dateTime,
    name: item.subject,
  };
}
