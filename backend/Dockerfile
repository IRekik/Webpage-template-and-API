FROM python:3.8-1

WORKDIR /app

COPY . /app

RUN python -m venv venv
RUN source venv/bin/activate
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "run.py"]