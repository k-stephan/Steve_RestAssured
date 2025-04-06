package com.api.automation.RestAssured;

import org.testng.annotations.Test;
import org.testng.AssertJUnit;
import org.testng.annotations.Test;
import org.testng.AssertJUnit;
import static org.testng.Assert.assertEquals;

import java.util.List;

import org.testng.annotations.Test;

import com.jayway.jsonpath.JsonPath;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;


import io.restassured.RestAssured;
import io.restassured.filter.cookie.CookieFilter;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.response.Response;

public class AppTest 
{
	
	@Test(enabled = true, groups =  {"smoke"},priority=2)
	
	public void getrequest()
	{
        RestAssured.baseURI = "https://jsonplaceholder.typicode.com";
        
        given()
        	.when()
        	.get(baseURI)
        	.then()
        	.assertThat()
        	.statusCode(200)
        	.log().all();
        	
        
		
	}
	
	
	@Test(enabled = true, groups =  {"smoke"},priority=1)
	public void getrequestposts()
	{
        RestAssured.baseURI = "https://jsonplaceholder.typicode.com/posts";
        
        String str=given()
        	.when()
        	.get(baseURI)
        	.then()
        	.assertThat()
        	.statusCode(200)
        	.extract()
        	.path("title[1]");
        
        AssertJUnit.assertEquals(str, "qui est esse");	
          
		
	}
    
	
	@Test(enabled = true, groups =  {"regression"})
	public void getrequestusersreponse()
	{
        RestAssured.baseURI = "https://jsonplaceholder.typicode.com/users";
        
        Response reponse=
        given()
        	.when()
        	.get(baseURI)
        	.then()
        	.assertThat()
        	.statusCode(200)
        	.extract()
        	.response();
        	//.log().all()
        	//.body("userId[1]",equalTo(1))̃̃̃;
        	//.body("id[1]", equalTo(2))
        	//.body("title[1]", equalTo("qui est esse"))
        
        System.out.println(reponse.asString().contains("Graham"));
        System.out.println(reponse.jsonPath().getString("username[1]"));
        
        String str=JsonPath.read(reponse.body().asString(),"$[0].username");      
        System.out.println(str);
       
       //JSONArray jarray= JsonPath.read(reponse.body().asString(),"$[*].username");    
       //System.out.println(jarray);
       
       List<String> strlist=JsonPath.read(reponse.body().asString(),"$[*].username");    
       System.out.println(strlist);
    	
	}
	
	
	@Test(enabled = true, groups =  {"regression"})
	public void getrequest1()
	{
        RestAssured.baseURI = "https://jsonplaceholder.typicode.com/users";
        
        expect().body("username", hasItems("Bret"))
        .response()
        .statusCode(200)
        .when()
        .get(baseURI);
        
        given()
        .filter(new RequestLoggingFilter())
        .filter(new CookieFilter())
        //.filter(new ResponseLoggingFilter())
        .when()
        .get(baseURI);
        
         
		
	}
	
	
}
