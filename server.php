<?php

$quizContent = array();
$result = false;

if(isset($_POST['quiz'])) {
	$quizContent = json_decode($_POST['quiz'], true);
	$result = true;
}
var_dump($quizContent['Quiz']);

$fp = fopen('data/'.preg_replace('/\s+/', '', $quizContent['Quiz']['title']).'.json', 'w');
fwrite($fp, json_encode($quizContent, JSON_PRETTY_PRINT));
fclose($fp);

return $result;
?>


