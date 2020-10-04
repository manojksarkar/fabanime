package com.apis;

import java.io.IOException;
import java.io.PrintWriter;
import java.rmi.ServerException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.models.Movie;

public class Movie_List extends HttpServlet{
	public static String getMovieList(String anime) throws Exception{
		String url = "jdbc:mysql://localhost:3306/fab_anime";
		String user = "root";
		String password = "root";
		
		Class.forName("com.mysql.jdbc.Driver");
		
		Connection connection = DriverManager.getConnection(url, user, password);
		
		String query = "SELECT * FROM movie WHERE anime_id = "
					+ "( SELECT anime_id FROM anime WHERE anime_name = '" + anime + "');";
		
		PreparedStatement pstm = connection.prepareStatement(query);
		ResultSet rs = pstm.executeQuery();
		
		ArrayList<Movie> movies = new ArrayList<Movie>();
		
		while(rs.next()) {
			Movie movie = new Movie(
					rs.getObject("movie_id",Integer.class),
					rs.getObject("movie_name", String.class),
					rs.getObject("anime_id", Integer.class),
					rs.getObject("release_date", Integer.class)
					);
			movies.add(movie);
		}
		
		Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
		String data = gson.toJson(movies);
		
		return data;
	}
	
	public void doGet(HttpServletRequest req, HttpServletResponse res){
		String animeName = req.getParameter("animename");
		try {
			String data = getMovieList(animeName);
			res.setContentType("application/json");
			res.setCharacterEncoding("UTF-8");
			PrintWriter out = res.getWriter();
			out.print(data);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void doPost(HttpServletRequest req, HttpServletResponse res) {
		doGet(req,res);
	}
}
