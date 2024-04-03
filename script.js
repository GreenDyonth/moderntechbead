class PasswordRules {
    constructor() {
        this.author = ["RN", "SV", "HKN"];
        this.title = "Rules";
        this.description = "blah blah";
        this.rules = [
            {
                title: "Number",
                severity: "error",
                penalty: 5,
                checkFunction: (pw) => /\d/.test(pw)
                // Megnézi, hogy van e benne szám
                // https://rswpthemes.com/how-to-check-if-a-string-contains-a-number-in-javascript/
            },
            {
                title: "Case Sensitive", // Kis-Nagybetű különbség ,
                severity: "warning",
                penalty: 5,
                checkFunction: (pw) => /[a-z]/.test(pw) && /[A-Z]/.test(pw)
                // https://www.geeksforgeeks.org/javascript-program-to-check-if-a-string-contains-uppercase-lowercase-special-characters-and-numeric-values/
            }
        ];
    }

    checkPassword(password) {
        let penalties = 10;
        let severities = null;
        let danger = false;

        let i = 0;
        while (i < this.rules.length && !danger) {
            const rule = this.rules[i];
            if (!rule.checkFunction(password)) {
                penalties -= rule.penalty;
                if (penalties <= 0) {
                    danger = true;
                }
                if (rule.severity === "error" && severities !== "error") {
                    severities = "error";
                }
                else if (severities !== "error") {
                    severities = rule.severity;
                }
            }
            i++;
        }

        return {penalties, severities, danger};
    }
}

// Teszt és kimenet megjelenítése a konzolon
const passwordRules = new PasswordRules();
const password = "abc";
const result = passwordRules.checkPassword(password);
console.log("Penalty:", result.penalties);
console.log("Severity:", result.severities);
if (result.danger){
    console.log("Túl rossz a jelszavad:", password)
}
else{
    console.log("Jó a jelszavad:", password)
}
