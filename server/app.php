<?php

	$reqtype = $_GET['reqtype'];

	if(isset($reqtype)) {

		$reqtype = $_GET['reqtype'];

		switch ($reqtype) {
		case 'read':
			sendFolderScan();
			break;
		case 'save':
			saveFile();
			break;
		default:
			handleUnknownQuery();
			break;
		}
	}


	function saveFile() {
		$path = $_GET['path'];
		$data = $_GET['data'];
		$success = false;
		if(isset($path) && isset($data)) {
			$path = $_GET['path'];
			$data = $_GET['data'];
			// TEST HERE
			$fp = fopen($path, 'w');
			if(fwrite($fp, json_encode($data))) {
				$success = true;
			}
			fclose($fp);
		}
		return $success;
	}
	function sendFolderScan() {
		$files = array();
		$data = array_diff(scandir('../data/themes/'), Array( ".", ".." ));
		foreach ($data as $key => $value) {
			$files []=$value;
		}
		echo json_encode($files);
	}
	function handleUnknownQuery() {
		echo 'ERROR : "'.$reqtype.'" is not a valid query type.';
	}
?>
