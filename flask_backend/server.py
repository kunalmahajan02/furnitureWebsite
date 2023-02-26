from flask import Flask


from transformers import AutoModelForSequenceClassification

# from transformers import TFAutoModelForSequenceClassification

from transformers import AutoTokenizer
import numpy as np
from scipy.special import softmax
from flask import request , jsonify ,json
from flask_marshmallow import Marshmallow
from flask_cors import CORS , cross_origin


app = Flask(__name__)
ma = Marshmallow(app)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
task='sentiment'
MODEL = f"cardiffnlp/twitter-roberta-base-{task}"

model = AutoModelForSequenceClassification.from_pretrained(MODEL)
model.save_pretrained(MODEL)
tokenizer = AutoTokenizer.from_pretrained(MODEL)
tokenizer.save_pretrained(MODEL)



@app.route("/sentiment" , methods = ['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def Sentimentalscore():
  exam = request.get_json()
  example = exam
  encoded_text = tokenizer(example,return_tensors='pt')
  output = model(**encoded_text)
  scores = output[0][0].detach().numpy()
  scores = softmax(scores)
  scores_map = {
    'Negative' : np.float64(scores[0]),
    'Neutral' : np.float64(scores[1]),
    'Positive' : np.float64(scores[2])
    }
  return jsonify(scores_map)


if __name__ == "__main__" :
  app.run(debug=True,port=5005)