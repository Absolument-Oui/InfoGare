function setError(caused_by, stacktrace) {
    document.getElementById('error_caused_by').value = caused_by;
    document.getElementById('error_stacktrace').innerText = stacktrace;
}