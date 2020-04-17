from enum import Enum
class EvaluationMetricType(Enum):
	MSE = 1
	ACCURACY = 2
	F1_SCORE = 3
	PRECISION = 4
	RECALL = 5
	ADJUSTED_MUTUTAL_INFO = 6
	
	
#CONSTANTS
zip_file_name = "SubmissionCode.zip"
code_file_name = "SubmissionCode.py"
predicted_test_Y_file_name = "predicted_test_Y.csv"
error_msg_field_name = "Evaluation failed"
error_code_field_name = "error_code"
test_x_file_path = "test_X.csv
actual_test_Y_file_path = "actual_test_Y.csv"


evaluation_metric_display_strs_dict = {EvaluationMetricType.MSE.value: "MSE", EvaluationMetricType.ACCURACY.value: "Accuracy",EvaluationMetricType.F1_SCORE.value: "F1 score",EvaluationMetricType.PRECISION.value: "Precision",EvaluationMetricType.RECALL.value: "Recall",EvaluationMetricType.ADJUSTED_MUTUTAL_INFO.value: "Adjusted Mutual Info" }

def run_code(user_notebook_file_path, m_test_X_file_path, cell_content):

	import os
	
	is_code_file_present = os.path.isfile(user_notebook_file_path)
	if(not is_code_file_present):
		raise Exception("WRONG_CODE_FILE", "Couldn't find the code file named '" +code_file_name+"'")
	try:		
		with open(user_notebook_file_path, "r") as in_file:
			content = in_file.read()
			import json
			content = json.loads(content)
			required_cell = None
			for cell in content["cells"]:
				if cell["source"][0] == cell_content:
					required_cell = cell
					break
			code = "import sys\nimport csv\n\n"
			code += ''.join([line for line in required_cell["source"]])
			code_call = "\nif __name__ == '__main__':\n    print(predict(sys.argv[1]))\n"
			code += code_call
			open(code_file_name, "w").write(code)
			in_file.close()
		os.system("python3 " + code_file_name + " " + m_test_X_file_path + " > " + predicted_test_Y_file_name)
	except e:
		raise Exception("CODE_ERROR", e+" - error" )
		
def get_pred_and_actual_y_arrays(m_predicted_Y_file_path, m_actual_Y_file_path):
	try:
		import csv
		import numpy as np
		with open(m_predicted_Y_file_path,newline='') as csvfile:
			y_pred = np.array(list(csv.reader(csvfile)))
		with open(m_actual_Y_file_path,newline='') as csvfile:
			y_true = np.array(list(csv.reader(csvfile)))
	except:
		raise Exception("WRONG_PREDICTED_Y_FILE","Couldn't generate the output file named '" + predicted_test_Y_file_name+"'")
	try:
		y_true = y_true.astype(np.float64)
		y_pred = y_pred.astype(np.float64)
		return y_true, y_pred
	except:
		raise Exception("WRONG_PREDICTED_Y_VALUES","Encountered unexpected data in output file")
	
	


def get_evaluation_metric_value(m_predicted_Y_file_path, m_actual_Y_file_path, m_evaluation_metric):
	y_true, y_pred = get_pred_and_actual_y_arrays(m_predicted_Y_file_path, m_actual_Y_file_path)
	try:
		metric_value = 0
		if(m_evaluation_metric == EvaluationMetricType.ACCURACY):
			from sklearn.metrics import accuracy_score
			metric_value = accuracy_score(y_true, y_pred)
		elif(m_evaluation_metric == EvaluationMetricType.PRECISION):
			from sklearn.metrics import precision_score
			metric_value = precision_score(y_true, y_pred) #TODO
		elif(m_evaluation_metric == EvaluationMetricType.RECALL):
			from sklearn.metrics import recall_score
			metric_value = recall_score(y_true, y_pred) #TODO
		elif(m_evaluation_metric == EvaluationMetricType.F1_SCORE):
			from sklearn.metrics import f1_score
			metric_value = f1_score(y_true, y_pred) #TODO
		elif(m_evaluation_metric == EvaluationMetricType.ADJUSTED_MUTUTAL_INFO):
			from sklearn.metrics.cluster import adjusted_mutual_info_score
			metric_value = adjusted_mutual_info_score(y_true, y_pred)
		else:
			from sklearn.metrics import mean_squared_error
			metric_value = mean_squared_error(y_true, y_pred)
		return metric_value
	except Exception as e:
		raise Exception("SKLEARN_ERROR",e)


"""
BackEnd will provide folder path of SubmissionZip.zip file submitted by student, test_x_file_path, actual_test_y_file_path, evaluation_metric submitted by content team 
Output format {"metric name": float, "error_code" : string, "error_message" : string}
"""
def evaluate_zipfile_with_test_code(user_submission_folder_path, evaluation_metric, cell_content):
	output_dict = {}
	try:
		run_code(user_submission_folder_path, test_x_file_path, cell_content)
		metric_value = get_evaluation_metric_value(user_submission_folder_path+predicted_test_Y_file_name,actual_test_y_file_path , evaluation_metric)
		metric_display_str = evaluation_metric_display_strs_dict[evaluation_metric]
		output_dict[metric_display_str] = metric_value
	except Exception as e:
		error_code, error_msg = e.args
		output_dict[error_msg_field_name] = error_msg
	return output_dict


#TESTING 
#output = evaluate_zipfile_with_test_code("C:/Users/GameDev2/Desktop/ProjectEvaluation/UserSubFolder/", "C:/Users/GameDev2/Desktop/ProjectEvaluation/EvalFolder/test_X.csv", "C:/Users/GameDev2/Desktop/ProjectEvaluation/EvalFolder/actual_test_Y.csv", EvaluationMetricType.MSE.value)
#print(output)
