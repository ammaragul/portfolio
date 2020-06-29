<?php
// define variables and set to empty values
$nameErr = $emailErr = $genderErr = $addrErr = $commentErr = "";
$name = $email = $gender = $comment = $address = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["name"])) {
    $nameErr = "Name is required";
  } else {
    $name = test_input($_POST["name"]);
    // check if name only contains letters and whitespace
    if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
      $nameErr = "Only letters and white space allowed";
    }
  }
  if (empty($_POST["email"])) {
    $emailErr = "Email is required";
  } else {
    $email = test_input($_POST["email"]);
    // check if e-mail address is well-formed
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $emailErr = "Invalid email format";
    }
  }
  if (empty($_POST["address"])) {
    $addrErr = "Address is Required";
  } else {
    $address = test_input($_POST["address"]);
    // check if URL address syntax is valid (this regular expression also allows dashes in the URL) 
	  if (!preg_match("/^[0-9-a-z ]+$/i",$address)) {
      $addrErr = "Only letters and numbers are allowed";
    }
  }
 if (empty($_POST["comment"])) {
    $commentErr = "Comment is Required";
  } else {
    $comment = test_input($_POST["comment"]);
  }
  if (empty($_POST["gender"])) {
    $genderErr = "Gender is required";
  } else {
    $gender = test_input($_POST["gender"]);
  }		
}
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>