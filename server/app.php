<?php


	if(isset($_GET['reqtype']) || isset($_POST['reqtype'])){
		$reqtype = (isset($_GET['reqtype'])) ? $_GET['reqtype'] : $_POST['reqtype'];
		if($reqtype) {
			switch ($reqtype) {
			case 'read':
				sendFolderScan();
				break;
			case 'save':
				saveFile();
				break;
			case 'delete':
				deleteFile();
				break;
			default:
				handleUnknownQuery();
				break;
			}
		}
	}
	function saveFile() {
		$data = $_POST['data'];
		$path = $_POST['path'];
		$success = false;
		if(isset($path) && isset($data)) {
			$fp = fopen($path, 'w');
			if(fwrite($fp, json_format(json_encode($data)))) {
				$success = true;
			}
			fclose($fp);
		}
		echo $path;
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
	function json_format($json) 
	{ 
	    $tab = "  "; 
	    $new_json = ""; 
	    $indent_level = 0; 
	    $in_string = false; 

	    $json_obj = json_decode($json); 

	    if($json_obj === false) 
	        return false; 

	    $json = json_encode($json_obj); 
	    $len = strlen($json); 

	    for($c = 0; $c < $len; $c++) 
	    { 
	        $char = $json[$c]; 
	        switch($char) 
	        { 
	            case '{': 
	            case '[': 
	                if(!$in_string) 
	                { 
	                    $new_json .= $char . "\n" . str_repeat($tab, $indent_level+1); 
	                    $indent_level++; 
	                } 
	                else 
	                { 
	                    $new_json .= $char; 
	                } 
	                break; 
	            case '}': 
	            case ']': 
	                if(!$in_string) 
	                { 
	                    $indent_level--; 
	                    $new_json .= "\n" . str_repeat($tab, $indent_level) . $char; 
	                } 
	                else 
	                { 
	                    $new_json .= $char; 
	                } 
	                break; 
	            case ',': 
	                if(!$in_string) 
	                { 
	                    $new_json .= ",\n" . str_repeat($tab, $indent_level); 
	                } 
	                else 
	                { 
	                    $new_json .= $char; 
	                } 
	                break; 
	            case ':': 
	                if(!$in_string) 
	                { 
	                    $new_json .= ": "; 
	                } 
	                else 
	                { 
	                    $new_json .= $char; 
	                } 
	                break; 
	            case '"': 
	                if($c > 0 && $json[$c-1] != '\\') 
	                { 
	                    $in_string = !$in_string; 
	                } 
	            default: 
	                $new_json .= $char; 
	                break;                    
	        } 
	    } 

	    return $new_json; 
	}
?>
