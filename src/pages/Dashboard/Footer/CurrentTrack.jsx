import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentTrack } from "../../../store/currentTrack";

export default function CurrentTrack() {
  const { token } = useSelector((state) => state.user);
  const currentTrack = useSelector((state) => state.currentTrack);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentTrack = async () => {
      dispatch(fetchCurrentTrack());
    };
    getCurrentTrack();
  }, [token, dispatch]);
  return (
    <Container>
      {currentTrack && (
        <div className="track">
          <div className="track__image">
            <img src={currentTrack.image} width={100} alt="currentTrack" />
          </div>
          <div className="track__info">
            <h4 className="track__info__track__name">{currentTrack.name}</h4>
            <h6 className="track__info__track__artists">
              {currentTrack.artists?.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__image {
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      &__track__name {
        color: white;
      }
      &__track__artists {
        color: #b3b3b3;
      }
    }
  }
`;
