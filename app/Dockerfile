# Install Operating system and dependencies
FROM cirrusci/flutter

# Run flutter doctor
RUN flutter doctor

# Copy files to container and build
RUN mkdir /app/
COPY . /app/
WORKDIR /app/
RUN flutter build apk
CMD [ "./up.sh" ]