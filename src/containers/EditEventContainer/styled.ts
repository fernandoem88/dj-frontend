import styled from "styled-components";

export const Form = styled.form.attrs({
  "data-tbsc-name": "EditEventContainer--Form",
})<{}>`
  & label {
    display: block;
  }
  & input {
    width: 100%;
    height: 40px;
    padding: 5px;
  }

  & textarea {
    width: 100%;
    height: 150px;
  }

  & input[type="submit"] {
    display: block;
    width: 100%;
    margin: 20px 0 30px;
  }
`;
Form.displayName = "EditEventContainerForm";

export const Grid = styled.div.attrs({
  "data-tbsc-name": "EditEventContainer--Grid",
})<{}>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
Grid.displayName = "EditEventContainerGrid";

export const File = styled.div.attrs({
  "data-tbsc-name": "EditEventContainer--File",
})<{}>`
  border: 1px #ccc solid;
  background-color: #f4f4f4;
  padding: 10px;
`;
File.displayName = "EditEventContainerFile";
