function isAuthorized(decoded, request, callback, unauthorized, internalServerError, config) {
  const domains = config.HOSTED_DOMAIN.split(/\s*,\s*/).filter(Boolean);
  const [, domain] = decoded.sub.split('@');
  if (domains.includes(domain.toLowerCase())) {
    callback(null, request);
  } else {
    unauthorized('Unauthorized', 'User ' + decoded.sub + ' is not permitted.', '', callback);
  }
}

function getSubject(decoded) {
  return decoded.payload.email;
}

exports.isAuthorized = isAuthorized;
exports.getSubject = getSubject;
