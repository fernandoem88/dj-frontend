import styled from "styled-components";

export const Event = styled.div.attrs({
  "data-tbsc-name": "DashboardEvent--Event",
})<{}>`
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px #ddd solid;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
Event.displayName = "DashboardEventEvent";

export const EventH4 = styled.h4.attrs({
  "data-tbsc-name": "DashboardEvent--EventH4",
})<{}>`
  margin-bottom: 10px;
  flex: 2;
`;
EventH4.displayName = "DashboardEventEventH4";

export const Btn = styled.a.attrs({
  "data-tbsc-name": "DashboardEvent--Btn",
})<{}>`
  margin: 10px;
`;
Btn.displayName = "DashboardEventBtn";

export const BtnDelete = styled(Btn).attrs({
  "data-tbsc-name": "DashboardEvent--BtnDelete",
})<{}>`
  color: red;
`;
BtnDelete.displayName = "DashboardEventBtnDelete";
