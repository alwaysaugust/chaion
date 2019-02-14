

<?php


// chech for valid email
function spamcheck($field) {
  //filter_var() sanitizes the e-mail
  //address using FILTER_SANITIZE_EMAIL
  $field=filter_var($field, FILTER_SANITIZE_EMAIL);

  //filter_var() validates the e-mail
  //address using FILTER_VALIDATE_EMAIL
  if(filter_var($field, FILTER_VALIDATE_EMAIL))
    {
    return TRUE;
    }
  else
    {
    return FALSE;
    }
  }


// signs user up for newsletter
if (isset($_REQUEST['email']))
  {//if "email" is filled out, proceed

  //check if the email address is invalid
  $mailcheck = spamcheck($_REQUEST['email']);
  if ($mailcheck==FALSE)
    {
    echo "1";
    }
  else
    {//send email
      
    $email = $_POST['email'] ;
    $f_name = htmlspecialchars( $_POST['name']);
    $subject = "$f_name sent you a message.";
    $msg = htmlspecialchars( $_POST['msg']);
      
    mail("carrie@aion.network", $subject, $msg, "From: " . $f_name . " < " . $email . ">" );
    echo "2";
    }
  }
else
  {//if "email" is not filled out
  echo "1";
  }
  
  
  
  
?>
