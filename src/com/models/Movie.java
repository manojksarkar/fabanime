package com.models;

public class Movie {
	private Integer movieId;
	private String movieName;
	private Integer animeId;
	private Integer releaseDate;
	
	
	
	public Movie(Integer movieId, String movieName, Integer animeId, Integer releaseDate) {
		super();
		this.movieId = movieId;
		this.movieName = movieName;
		this.animeId = animeId;
		this.releaseDate = releaseDate;
	}
	public Integer getMovieId() {
		return movieId;
	}
	public void setMovieId(Integer movieId) {
		this.movieId = movieId;
	}
	public String getMovieName() {
		return movieName;
	}
	public void setMovieName(String movieName) {
		this.movieName = movieName;
	}
	public Integer getAnimeId() {
		return animeId;
	}
	public void setAnimeId(Integer animeId) {
		this.animeId = animeId;
	}
	public Integer getReleaseDate() {
		return releaseDate;
	}
	public void setReleaseDate(Integer releaseDate) {
		this.releaseDate = releaseDate;
	}
	
	
}
