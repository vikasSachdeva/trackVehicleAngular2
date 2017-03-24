import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { NavController, ViewController, ModalController, LoadingController, Loading, Events } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import firebase from 'firebase';

@Injectable()
export class AuthServices {
    fireAuth: any;
    items: any;
    subscriptions: Subscription[] = [];
    loading: Loading;
    // subscriptionNames: string[] = [];
    firebase: any;
    constructor(public af: AngularFire, private loadingCtrl: LoadingController,) {
        // af.auth.subscribe(user => {
        //     console.info("user");
        //     console.info(user);
        //     if (user) { 
        //         // this.fireAuth = user.auth;
        //      }
        // });
    }

    checkUserSession(loginCallback, errCallback): any {
          this.af.auth.subscribe(user => {
            console.log("user");
            console.log(user);
            console.log(this.af.auth.getAuth());
            if (this.af.auth.getAuth()) { 
                loginCallback(user.auth);
                   // this.fireAuth = user.auth;
             }
             else {
                errCallback();  
             }
        });
        // return firebase.auth().onAuthStateChanged((user) => {
        //     console.log("user");
        //     console.log(this.fireAuth);
        //     if (user && user!=this.fireAuth) {
        //          console.log("loginCallback");
        //     console.log(user.toJSON());
        //         this.fireAuth = user; 
        //         // loginCallback(user);
        //     } else {
        //         errCallback();
        //     }
        // }, err => console.log(err), ()=>console.log("compl"));
    }

    loginUser(email: string, password: string): any {
        return this.af.auth.login({ email: email, password: password }, { provider: AuthProviders.Password, method: AuthMethods.Password });
    }

    resetPassword(email: string): any {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    logoutUser(): any {
        
        this.subscriptions.forEach((subscription, index) => {
            
            console.info(subscription);
            this.subscriptions.splice(index, 1);
            // console.info(this.subscriptionNames[this.subscriptions.indexOf(subscription)]);
            subscription.unsubscribe()
        });

        console.info("logout");

        return this.af.auth.logout();
        // return firebase.auth().signOut();
        
    }

    signupUser(newEmail: string, newPassword: string): any {
        return this.af.auth.createUser({ email: newEmail, password: newPassword });
    }

    getObservable(node: string, query?: any) {
        if (query) {
            return this.af.database.list(node, { query: query });
        } else {
            return this.af.database.list(node);
        }
    }


    /*
     * node - node name 'requests'
     * query - query for main node '{ orderByChild: 'supervisor_id', equalTo: 3 }'
     * childNodes - [{node: 'users', query: {orderByChild: 'id', equalToKey: 'supervisor_id', condition: 'equalTo'}, assignToKey: 'supervisor'}, ...]
     * 
     * 
     * experimental: {node: 'users', query: {orderByChild: 'id', equalToKey: 'supervisor_id', limitToFirst:1}, assignToKey: 'supervisor', childNodes:{node: 'users', query: {orderByChild: 'id', equalToKey: 'supervisor_id'}, assignToKey: 'supervisor'}}
     */
    chainData(node: string, query: {}, childNodes: any[]) {
        let childRun = (child, request) => {
            let childQuery = {
                orderByChild: child.query.orderByChild
            };

            console.info(child);
            console.info(request);

            childQuery[child.query.condition] = request[child.query.equalToKey];
            if (child.query.limitToFirst > 0) {
                childQuery['limitToFirst'] = child.query.limitToFirst;
            }
            console.info(childQuery);
            this.getData(child.node, childData => {
                console.info(childData);
                if (child.query.limitToFirst == 1) {
                    request[child.assignToKey] = childData[0];
                    if (child.childNodes) {
                        console.info(child.node);
                        console.info(request[child.assignToKey]);
                        console.info(request);
                        child.childNodes.forEach(grandChild => childRun(grandChild, request[child.assignToKey]));
                    }
                } else {
                    request[child.assignToKey] = childData;
                    if (child.childNodes) {
                        request[child.assignToKey].forEach(requestChild => child.childNodes.forEach(child => childRun(child, requestChild)));
                    }
                }
                console.info(request);
            }, childQuery);
            // this.af.database.list(child.node, {
            //     query: childQuery
            // }).subscribe(childData => { console.info(childData); request[child.assignToKey] = childData[0];console.info(request); });
        };
        let data = this.af.database.list(node, {
            query: query
        }).map(requests => {
            console.info(requests);
            return requests.map(request => {
                childNodes.forEach(child => childRun(child, request));
                console.info(request.supervisor);
                console.info(request);
                return request;
            });
        });



        /*let data = this.af.database.list(`requests`, {
            query: {
                orderByChild: 'supervisor_id',
                equalTo: 3
            }
        })
            .map(requests => {
                console.info(requests); return requests.map(request => {

                    this.af.database.list(`users`, {
                        query: {
                            orderByChild: 'id',
                            equalTo: request.supervisor_id
                        }
                    }).subscribe(users => {console.info(users); request.supervisor=users[0];});

                    console.info(request.supervisor);
                    console.info(request);
                    return request;
                });
            }
            );*/
        return data;
    }


    // chainData(node, query, childNodes) {
    //     let requests = this.af.database.list(`requests`, {
    //         query: {
    //             orderByChild: 'supervisor_id',
    //             equalTo: 3
    //         }
    //     })
    //         .map(requests => {
    //             console.info(requests); return requests.map(request => {
    //                 this.af.database.list(`users`, {
    //                     query: {
    //                         orderByChild: 'id',
    //                         equalTo: request.supervisor_id
    //                     }
    //                 }).subscribe(users => {console.info(users); request.supervisor=users[0];});


    //                 // let xxs = this.af.database.list(`users`, {
    //                 //             query: {
    //                 //                 orderByChild: 'id',
    //                 //                 equalTo: 3
    //                 //             }
    //                 //         }).map(project => {
    //                 //             console.info(project);
    //                 //             return project;});
    //                 //         console.info(xxs);


    //                 // let supervisors = this.af.database.list(`users`, {
    //                 //     query: {
    //                 //         orderByChild: 'id',
    //                 //         equalTo: request.supervisor_id
    //                 //     }
    //                 // }).map(users => {
    //                 //     console.info(users);
    //                 //     return users;
    //                 // });
    //                 // request.supervisor = supervisors;
    //                 console.info(request.supervisor);
    //                 console.info(request);
    //                 return request;
    //             });
    //         }
    //         //  requests.map(request => {
    //         //     return this.af.database.list(`requests`, {
    //         //         query: {
    //         //             orderByChild: 'id',
    //         //             equalTo: request.supervisor_id
    //         //         }
    //         //     });
    //         // }
    //         //)
    //         );
    //     return requests;
    // }

    getData(node: string, callback, query?: any): any {
        //    return this.af.database.list(node, {
        //    query: {
        //    orderByChild: 'size',
        //    equalTo: 'large',
        //    orderByKey: true,
        //   }});
        console.info(node);
        if (query) {
            let querySubscribe = (this.af.database.list(node, { query: query })).subscribe(queryItems => {
                callback(queryItems);
                // querySubscribe.unsubscribe();
                this.subscriptions.push(querySubscribe);
                // this.subscriptionNames.push(node);
            }, err => {
                console.info(err);
                console.info(node);
                console.info(query);
            });
        } else {
            let querySubscribe = (this.af.database.list(node)).subscribe(queryItems => {
                callback(queryItems);
                // querySubscribe.unsubscribe();
                this.subscriptions.push(querySubscribe);
                // this.subscriptionNames.push(node);
            }, err => {
                console.info(err);
                console.info(node);
                console.info(query);
            });
        }

    }

    pushData(node: string, data, query?: any): any {
        if (query) {
            this.af.database.list(node, { query: query }).push(data);
        } else {
            this.af.database.list(node).push(data);
        }
    }

    updateData(node: string, data, query?: any): any {
        console.info('== firbase update ==');
        console.info(data);        
        let key = data.$key;
        console.info(data.$key); 
        delete data.$key;       
        if(data.$exists) { delete data.$exists} 
        if (query) {
            console.info('query ');
            this.af.database.list(node, { query: query }).update(key, data);
            console.info('end query');
        } else {
            this.af.database.list(node).update(key, data);
        }
    }

    deleteItem(node: string, key: string) {
        console.info(key);
        let queryObservable: any;
        this.items = this.af.database.list(node);
        if (key) {
            queryObservable = this.items.remove(key).then(_ => console.info('== item deleted!'));
        }
        console.info(queryObservable);
    }

};