Feature: URL Navigation

    @skip
    Scenario: Navigate to the home page
        Given I am on the home page "https://www.clinicalink.com/technology/"
        Then I should see the title "Clinical ink"
    @skip
    Scenario: Verify if all options exists up on Hover
        Given I am on the home page "https://www.clinicalink.com/technology/"
        When I hover over the "Technology" menu
        Then I should see the options "GlucoseReady", "SPUR™"
    @skip
    Scenario: Verify tables of contents
        Given I am on the home page "https://demoqa.com/webtables"
        When I scroll down to the table
        Then I should see the table with headers "First Name", "Last Name", "Age", "Email", "Salary", "Department"
    @skip
    Scenario: Verify tables of contents
        Given I am on the home page "https://demoqa.com/webtables"
        When I scroll down to the table
        Then Validate the Rows of the table
    @skip
    Scenario: Verify Broken Links
        Given I am on the home page "https://demoqa.com/links"
        And Validate the Broken Links 
    @skip
    Scenario: Verify Upload feature
        Given I am on the home page "https://demoqa.com/upload-download"
        Then Validate the upload file feature

    Scenario: Verify download feature
        Given I am on the home page "https://demoqa.com/upload-download"
        Then Validate the download file feature