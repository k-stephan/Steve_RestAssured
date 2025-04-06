package com.api.automation.RestAssured;

import org.hamcrest.Matchers;
import org.testng.annotations.Test;
import io.restassured.RestAssured;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import net.minidev.json.JSONObject;

public class creakebookingwithpost 
{
	
	
	@Test(enabled = true, groups =  {"smoke"}, priority=0)

	public void createbooking()
	{
		String baseurl = "https://restful-booker.herokuapp.com/booking";
		
		//prepare request body
				JSONObject booking = new JSONObject();
				JSONObject bookingDates = new JSONObject();
				
				booking.put("firstname", "api testing");
				booking.put("lastname", "tutorial");
				booking.put("totalprice", 1000);
				booking.put("depositpaid", true);
				booking.put("additionalneeds", "breakfast");
				booking.put("bookingdates", bookingDates);
				
				bookingDates.put("checkin", "2023-03-25");
				bookingDates.put("checkout", "2023-03-30");
				
		
				Response response=
		RestAssured
				.given()
					.contentType(ContentType.JSON)
					.body(booking.toString())
					.filter(new RequestLoggingFilter())
				.when()
					.post(baseurl)
				.then()
					.assertThat()
					.statusCode(200)
					.body("booking.firstname",Matchers.equalTo("api testing"))
					.extract()
					.response();
				
				int booking_id=response.path("bookingid");
				
			
				RestAssured
				.given()
					.contentType(ContentType.JSON)
					.pathParam("bookingID", booking_id)
					.baseUri("https://restful-booker.herokuapp.com/booking")
				.when()
					.get("{bookingID}")
				.then()
					.assertThat()
					.statusCode(200)
					.body("firstname", Matchers.equalTo("api testing"))
					.body("lastname", Matchers.equalTo("tutorial"));
	}

}
