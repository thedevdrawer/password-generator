var __result = $("#result");
var __length = $("#length");
var __uppercase = $("#uppercase");
var __lowercase = $("#lowercase");
var __numbers = $("#numbers");
var __symbols = $("#symbols");
var __generate = $("#generate");
var __clipboard = $("#clipboard");

var randomF = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
};

$(function () {
	$("#rangeText").html(__length.val());
	__length.on("change", function () {
		$("#rangeText").html($(this).val());
	});
});

__clipboard.on("click", function () {
	var password = __result;
	if (!password) {
		return;
	}

	password.select();
	document.execCommand("copy");
	alert("Copied to clipboard!");
	__result.val("");
});

__generate.on("click", function () {
	var length = __length.val();
	var hasUpper = __uppercase.is(":checked");
	var hasLower = __lowercase.is(":checked");
	var hasNumber = __numbers.is(":checked");
	var hasSymbol = __symbols.is(":checked");
	var password = generatePassword(
		hasLower,
		hasUpper,
		hasNumber,
		hasSymbol,
		length
	);
	__result.val(password);
});

function generatePassword(lower, upper, number, symbol, length) {
	var generatePasswordStr = "";

	var typesArr = {
		lower: lower,
		upper: upper,
		number: number,
		symbol: symbol,
	};

	for (let i = 0; i <= length; i++) {
		$.each(typesArr, function (key, value) {
			if (value != false) {
				var functionName = key;
				generatePasswordStr += randomF[functionName]();
			}
		});
	}

	var finalPassword = generatePasswordStr.slice(0, length);
	return finalPassword;
}

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	var symbols = "!@#$%^&*(){}[]=<>/,.";
	return symbols[Math.floor(Math.random() * symbols.length)];
}
