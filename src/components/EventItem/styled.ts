import styled from "styled-components";

export const EventSC = styled.div.attrs({
  "data-tbsc-name": "EventItem--EventSC",
})<{}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  padding: 13px;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;
EventSC.displayName = "EventItemEventSC";

export const EventImg = styled.div.attrs({
  "data-tbsc-name": "EventItem--EventImg",
})<{}>`
  flex: 1;
  margin: 10px;
`;
EventImg.displayName = "EventItemEventImg";

export const Info = styled.div.attrs({
  "data-tbsc-name": "EventItem--Info",
})<{}>`
  flex: 2;
  @media (max-width: 600px) {
    margin-bottom: 20px;
  }
`;
Info.displayName = "EventItemInfo";
