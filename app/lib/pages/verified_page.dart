import 'package:area/pages/home.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class VerificationPage extends StatefulWidget {
  const VerificationPage({Key? key}) : super(key: key);

  @override
  VerificationPageState createState() => VerificationPageState();
}

class VerificationPageState extends State<VerificationPage> {
  @override
  Widget build(BuildContext context) {
    bool checkUserVerified = FirebaseAuth.instance.currentUser!.emailVerified;
    return StreamBuilder(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        if (checkUserVerified == true) {
          return const Home();
        } else {
          return Scaffold(
            body: SafeArea(
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      'A verfication link has been sent to your email',
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: () {
                        bool checkUserVerified =
                            FirebaseAuth.instance.currentUser!.emailVerified;
                        FirebaseAuth.instance.currentUser!.reload();
                        if (checkUserVerified == true) {
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const Home(),
                            ),
                          );
                        }
                      },
                      child: const Text('Verify'),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        FirebaseAuth.instance.currentUser!
                            .sendEmailVerification();
                      },
                      child: const Text('Resend Verification Link'),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        Navigator.pushReplacementNamed(context, '/login');
                      },
                      child: const Text('Back to login'),
                    ),
                  ],
                ),
              ),
            ),
          );
        }
      },
    );
  }
}
