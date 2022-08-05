import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { BryntumCalendar } from "@bryntum/calendar-react";
import "./App.scss";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import {
  callMsGraph,
  formatEvents,
  graphConfig,
  loginRequest,
} from "./helpers";

const App: FunctionComponent = () => {
  const { instance, accounts } = useMsal();
  const [events, setEvents] = useState([]);

  const requestCalendarData = useCallback(() => {
    if (instance && accounts.length) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          callMsGraph(graphConfig.calenderEndpoint, response.accessToken).then(
            (response) => {
              setEvents(response.value.map(formatEvents));
            }
          );
        });
    }
  }, [accounts, instance]);

  useEffect(() => {
    requestCalendarData();
  }, [requestCalendarData]);

  return (
    <div>
      <AuthenticatedTemplate>
        <BryntumCalendar events={events} />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h5 className="card-title">
          Please{" "}
          <button
            onClick={() => {
              instance.loginRedirect(loginRequest).catch((e) => {
                console.log(e);
              });
            }}
          >
            sign in
          </button>{" "}
          to see your profile information.
        </h5>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default App;
