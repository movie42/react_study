import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath, makeVideoPath } from "../utils";

const Wrapper = styled.div`
  /* background-color: black; */
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  position: relative;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6rem;

  &::after {
    position: absolute;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
      url(${(props) => props.bgphoto});
    background-position: center;
    background-size: cover;
    content: "";
  }
`;

const Title = styled.h2`
  font-size: 6.8rem;
  margin-bottom: 1rem;
`;

const Overview = styled.p`
  font-size: 2rem;
  width: 100%;
`;

const Slider = styled.div`
  position: relative;
  top: -10rem;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  font-size: 5rem;
  color: white;
  background-image: url(${(props) => props.bgphoto});
  background-position: center center;
  background-repeat: no-repeat;
  background-color: black;
  background-size: cover;
  height: 200px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  display: none;
  position: absolute;
  width: 100%;
  bottom: -2.4rem;
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 1.4rem;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  opacity: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const MovieInfoWindow = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.black.lighter};
`;

const MovieCoverImg = styled.div<{ bgphoto: string }>`
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  height: 45%;
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.bgphoto});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;
const MovieCoverTitle = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: -6rem;
  padding: 1rem;
`;

const MovieCoverOverView = styled.p`
  padding: 0 1rem;
  font-size: 1.2rem;
  line-height: 1.3;
`;

const gridVariants = {
  hidden: {
    x: window.outerWidth + 5
  },
  visible: {
    x: 0
  },
  exit: {
    x: -window.outerWidth - 5
  }
};

const boxVariants = {
  normal: {
    scale: 1,
    transition: {
      type: "tween"
    }
  },
  hover: {
    scale: 1.2,
    y: -50,
    transition: {
      duration: 0.3,
      delay: 0.2,
      type: "tween"
    }
  }
};

const infoVariants = {
  hover: {
    display: "block",
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.2,
      type: "tween"
    }
  }
};

const offset = 6;

function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increseIndex = () => {
    if (data) {
      if (leaving) return;
      setLeaving(true);
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving(!leaving);

  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };

  const onOverlayClick = () => history.push("/");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id.toString() === bigMovieMatch.params.movieId
    );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increseIndex}
            bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={index}
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 0.5 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id.toString()}
                      key={movie.id}
                      variants={boxVariants}
                      whileHover="hover"
                      initial="normal"
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                      onClick={() => onBoxClicked(movie.id)}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <MovieInfoWindow
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <MovieCoverImg
                        bgphoto={makeImagePath(clickedMovie.backdrop_path)}
                      />
                      <MovieCoverTitle>{clickedMovie.title}</MovieCoverTitle>
                      <h4
                        style={{
                          padding: "0 1rem",
                          fontSize: "1.5rem",
                          fontWeight: 900,
                          marginBottom: "0.6rem"
                        }}
                      >
                        OverView
                      </h4>
                      <MovieCoverOverView>
                        {clickedMovie.overview}
                      </MovieCoverOverView>
                    </>
                  )}
                </MovieInfoWindow>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
