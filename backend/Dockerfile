FROM python:3.11

WORKDIR /opt/app

RUN pip install gunicorn

RUN mkdir -p backend
COPY requirements.txt backend
RUN pip install -r backend/requirements.txt

COPY . backend

EXPOSE 5000
CMD ["gunicorn", "-b", "0.0.0.0:5000", "backend.app:app"]