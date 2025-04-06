package com.api.automation.RestAssured;

import org.testng.annotations.Test;

import io.restassured.RestAssured;

public class BrachGitExample 
{

	@Test
	public void getbookingwithfirstname()
	{
		String baseurl="https://restful-booker.herokuapp.com";	
		
		RestAssured 
			.given()
				.baseUri(baseurl)
				.queryParams("firstname", "api testing")
			.when()
				.get("/booking")
			.then()
				.assertThat()
				.log().all()
				.statusCode(200);

				
	}
}
