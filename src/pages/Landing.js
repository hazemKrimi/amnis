import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../contexts/MainContext';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../components/Loader';

const Container = styled.div`
	width: 90%;
	margin: 3rem auto;

	h1 {
		font-family: 'Poppins';
		font-size: 40;
	}

	.videos {
		margin-top: 2rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		justify-content: center;
		align-items: center;
		grid-gap: 2rem;

		.video {
			cursor: pointer;
			width: 100%;
			display: grid;
			grid-template-columns: 1fr;
			justify-content: center;
			align-items: center;
			row-gap: 0.5rem;

			.thumbnail {
				height: 0;
				overflow: hidden;
				padding-top: calc(591.44 / 1127.34 * 100%);
				position: relative;

				img {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}

				.no-thumbnail {
					position: absolute;
					display: grid;
					justify-content: center;
					align-items: center;
					border: 1px solid ${({ darkMode }) => (darkMode ? '#FFFFFF' : '#07070A')};
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					font-size: 2.5rem;
					color: ${({ darkMode }) => (darkMode ? '#FFFFFF' : '#07070A')};
					text-align: center;
				}
			}

			.info {
				display: grid;
				grid-template-columns: auto 1fr;
				justify-content: center;
				align-items: center;
				column-gap: 1rem;

				.profile {
					width: 2.5rem;
					height: 2.5rem;
					border-radius: 50%;
					background: ${({ darkMode }) => (darkMode ? '#24272B' : '#F3F4F9')};
					display: grid;
					justify-items: center;
					align-items: center;

					.avatar {
						width: 2.5rem;
						height: 2.5rem;
						border-radius: 50%;
					}

					svg {
						width: 1.25rem;
						height: 1.25rem;
					}
				}

				.meta {
					display: grid;
					grid-template-columns: 1fr;
					justify-content: center;
					align-items: center;
					row-gap: 0.1rem;

					h3 {
						cursor: pointer;
					}

					.views {
						color: #ffffff;
						display: grid;
						grid-template-columns: repeat(2, auto);
						justify-content: flex-start;
						align-items: center;
						column-gap: 0.5rem;

						.eye {
							width: 1rem;
							height: 1rem;
						}

						p {
							color: ${({ darkMode }) => (darkMode ? '#FFFFFF' : '#07070A')};
						}
					}
				}
			}
		}
	}

	.error {
		height: 100vh;
		display: grid;
		grid-template-rows: auto;
		justify-content: center;
		align-items: center;

		h1 {
			font-family: 'Poppins';
			text-align: center;
		}
	}
`;

const Landing = () => {
	const { videos, getVideos, darkMode } = useContext(MainContext);
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				await getVideos();
				setLoading(false);
			} catch (err) {
				setLoading(false);
			}
		})();
		// eslint-disable-next-line
	}, []);

	return !loading ? (
		<Container darkMode={darkMode}>
			{videos && videos.length > 0 ? (
				<>
					<h1>Recent Videos</h1>
					<div className='videos'>
						{videos.map(video => (
							<div className='video' key={video.id}>
								<div className='thumbnail' onClick={() => history.push(`video/${video.id}`)}>
									{video.thumbnail ? (
										<img alt='thumbnail' src={video.thumbnail} />
									) : (
										<h2 className='no-thumbnail'>No Thumbnail</h2>
									)}
								</div>
								<div className='info'>
									<div className='profile'>
										{video.user.photoURL ? (
											<div
												className='avatar'
												style={{
													backgroundImage: `url(${video.user.photoURL})`,
													backgroundSize: 'cover',
													backgroundPosition: 'center'
												}}
											></div>
										) : (
											<svg viewBox='0 0 34 34'>
												<g transform='translate(1 1.247)'>
													<path
														d='M36,27.916V23.61C36,18.855,32.418,15,28,15H12c-4.418,0-8,3.855-8,8.61v4.305'
														transform='translate(-4 3.838)'
														fill='none'
														stroke={darkMode ? '#FFFFFF' : '#07070A'}
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth='2'
													/>
													<ellipse
														cx='8'
														cy='9'
														rx='8'
														ry='9'
														transform='translate(8 -0.247)'
														fill='none'
														stroke={darkMode ? '#FFFFFF' : '#07070A'}
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth='2'
													/>
												</g>
											</svg>
										)}
									</div>
									<div className='meta'>
										<h3
											onClick={() =>
												video.live
													? history.push(`live/${video.id}`)
													: history.push(`video/${video.id}`)
											}
										>
											{video.title}
										</h3>
										<h5>{video.user.displayName}</h5>
										<div className='views'>
											<svg className='eye' viewBox='0 0 26.292 19.667'>
												<g transform='translate(0 -3)'>
													<path
														d='M1,12.833S5.417,4,13.146,4s12.146,8.833,12.146,8.833-4.417,8.833-12.146,8.833S1,12.833,1,12.833Z'
														fill='none'
														stroke={darkMode ? '#FFFFFF' : '#07070A'}
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth='2'
													/>
													<circle
														cx='3.5'
														cy='3.5'
														r='3.5'
														transform='translate(10 9)'
														strokeWidth='2'
														stroke={darkMode ? '#FFFFFF' : '#07070A'}
														strokeLinecap='round'
														strokeLinejoin='round'
														fill='none'
													/>
												</g>
											</svg>
											<p>{video.views}</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</>
			) : (
				<div className='error'>
					<h1>No Videos Found</h1>
				</div>
			)}
		</Container>
	) : (
		<Loader />
	);
};

export default Landing;
