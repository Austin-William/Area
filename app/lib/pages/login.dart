import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:provider/provider.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:area/api/auth_google.dart';
import 'package:area/api/auth_email.dart';
import 'package:area/global/variables.dart' as global;

class Login extends StatefulWidget {
  const Login({Key? key}) : super(key: key);

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  bool isVisible = true;
  String errorMessage = '';
  Dio dio = Dio();

  Widget emailField() {
    return (Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: 16,
      ),
      child: TextField(
        controller: emailController,
        decoration: InputDecoration(
          prefixIcon: const Icon(Icons.mail),
          suffixIcon: emailController.text.isEmpty
              ? const Text(
                  '',
                  textDirection: TextDirection.ltr,
                )
              : GestureDetector(
                  onTap: () {
                    emailController.clear();
                  },
                  child: const Icon(
                    Icons.close,
                  ),
                ),
          hintText: 'Email',
          labelText: 'Email',
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(
              color: Colors.red,
              width: 1,
            ),
          ),
        ),
      ),
    ));
  }

  Widget passwordField() {
    return (Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: 16,
      ),
      child: TextField(
        obscureText: isVisible,
        controller: passwordController,
        decoration: InputDecoration(
          prefixIcon: const Icon(
            Icons.lock,
          ),
          suffixIcon: GestureDetector(
            onTap: () {
              setState(() {
                isVisible = !isVisible;
              });
            },
            child: Icon(
              isVisible ? Icons.visibility : Icons.visibility_off,
            ),
          ),
          hintText: 'Password',
          labelText: 'Password',
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(
              color: Colors.red,
              width: 1,
            ),
          ),
        ),
      ),
    ));
  }

  Widget errorMessageDisplay() {
    return (Flexible(
      child: Text(
        errorMessage,
        textDirection: TextDirection.ltr,
        style: const TextStyle(color: Colors.red),
      ),
    ));
  }

  Widget submitButton() {
    return (ElevatedButton(
      onPressed: () {
        if (emailController.text.isEmpty && passwordController.text.isEmpty) {
          setState(() {
            errorMessage = 'Please fill in all the fields';
          });
        } else {
          if (emailController.text.isEmpty || passwordController.text.isEmpty) {
            if (emailController.text.isEmpty) {
              setState(() {
                errorMessage = 'Please enter an email';
              });
            }
            if (passwordController.text.isEmpty) {
              setState(() {
                errorMessage = 'Please enter a password';
              });
            }
          } else {
            errorMessage = '';
            global.isLoggedIn = true;
            EmailLoginProvider()
                .signIn(
                    email: emailController.text,
                    password: passwordController.text)
                .then(
              (value) {
                if (value == null) {
                  Navigator.pushNamed(context, '/home');
                } else {
                  setState(
                    () {
                      errorMessage = value;
                    },
                  );
                }
              },
            );
          }
        }
      },
      child: const Padding(
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        child: Text(
          'Submit',
          textDirection: TextDirection.ltr,
        ),
      ),
    ));
  }

  Widget createAccount() {
    return Container(
      decoration: const BoxDecoration(
        borderRadius: BorderRadius.all(
          Radius.circular(8),
        ),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: <Color>[
            Color.fromARGB(255, 153, 153, 153),
            Color.fromARGB(255, 128, 128, 128),
            Color.fromARGB(255, 100, 100, 100),
          ],
        ),
      ),
      child: IconButton(
        onPressed: (() {
          Navigator.pushNamed(context, '/register');
        }),
        icon: const Icon(Icons.person_add),
        iconSize: 30,
      ),
    );
  }

  Widget googleConnection() {
    return (Flexible(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          ElevatedButton.icon(
            onPressed: () {
              final provider = Provider.of<GoogleLoginProvider>(
                context,
                listen: false,
              );
              provider.googleLogin();
            },
            label: const Text(
              'Connect with Google',
              textDirection: TextDirection.ltr,
            ),
            icon: const FaIcon(
              FontAwesomeIcons.google,
              color: Colors.black,
            ),
          ),
        ],
      ),
    ));
  }

  Widget enterSettings() {
    return Container(
      decoration: const BoxDecoration(
        borderRadius: BorderRadius.all(
          Radius.circular(8),
        ),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: <Color>[
            Color.fromARGB(255, 153, 153, 153),
            Color.fromARGB(255, 128, 128, 128),
            Color.fromARGB(255, 100, 100, 100),
          ],
        ),
      ),
      child: IconButton(
        onPressed: (() {
          Navigator.pushNamed(context, '/settings');
        }),
        icon: const Icon(Icons.settings),
        iconSize: 30,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            'Login',
            textDirection: TextDirection.ltr,
            style: TextStyle(
              fontSize: 40,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 36),
          emailField(),
          const SizedBox(height: 16),
          passwordField(),
          const SizedBox(height: 16),
          errorMessageDisplay(),
          submitButton(),
          const SizedBox(height: 26),
          googleConnection(),
          const SizedBox(height: 80),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              createAccount(),
              const SizedBox(width: 16),
              enterSettings(),
            ],
          ),
        ],
      ),
    );
  }
}
