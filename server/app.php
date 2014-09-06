<?php
	if(isset($_GET['reqtype'])){
		$reqtype = $_GET['reqtype'];
		if($reqtype) {
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
	}
	function saveFile() {
		$jsondata = json_decode($_GET['quizData']);
		$data = $jsondata;
		$path = $jsondata['path'];
		$success = false;
		if(isset($path) && isset($data)) {
			$fp = fopen($path, 'w');
			if(fwrite($fp, json_encode($data))) {
				$success = true;
			}
			fclose($fp);
		}
		echo json_encode($success);
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
