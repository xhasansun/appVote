import styled from "styled-components";

export const VoteListStyled = styled.div`
.voteList {
    &-content {
        display: flex;
        flex-direction: row;
          &-title {
            font-weight: 600;
            font-size: min(16px, calc(12px + 0.390625vw));
            line-height: 32px;
            color: chartreuse;
          }
          &-address {
            font-weight: 400;
            font-size: 14px;
            line-height: 28px;
            color: red;
            max-width: 500px;
          }
        }
    }
`;


