import styled from "styled-components";

const Wrapper = styled.div`
  .styledBtn {
    min-width: 150px;
    padding: 8px 16px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: #fff !important;
    font-weight: 600;
    background-color: #3399FF;
  }
`;

export default function MyButton({ title, ...props }) {
  return (
    <Wrapper>
      <button className="styledBtn" {...props}>
        {title}
      </button>
    </Wrapper>
  );
}
