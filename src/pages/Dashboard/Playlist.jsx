import React, { useEffect } from "react";
import styled from "styled-components";
import { fetchPlaylists, playlistActions } from "../../store/playlist";
import { useDispatch, useSelector } from "react-redux";
export default function Playlist() {
  const { token } = useSelector((state) => state.user);
  const { playlists } = useSelector((state) => state.playlist);

  const dispatch = useDispatch();
  const getPlaylistData = () => {
    dispatch(fetchPlaylists());
  };

  useEffect(() => {
    getPlaylistData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch(playlistActions.selectPlaylist(selectedPlaylistId));
  };
  return (
    <Container>
      <ul>
        {playlists.map(({ name, id }) => {
          return (
            <li key={id} onClick={() => changeCurrentPlaylist(id)}>
              {name}
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  color: #b3b3b3;
  height: 100%;
  overflow: hidden;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
  }
`;
