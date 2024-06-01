import { initializeApp } from 'firebase/app'
import {
	getDownloadURL,
	getStorage,
	ref as RefStorage,
	uploadBytes,
} from 'firebase/storage'

import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'
import { getDatabase, onValue, push, ref, set } from 'firebase/database'


const firebaseConfig = {
	apiKey: "AIzaSyA36H1U0NLZ1mkJn8EnJ5PFhE4NvRxhjFQ",
	authDomain: "diploma-work-182d4.firebaseapp.com",
	databaseURL: "https://diploma-work-182d4-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "diploma-work-182d4",
	storageBucket: "diploma-work-182d4.appspot.com",
	messagingSenderId: "688928788212",
	appId: "1:688928788212:web:97d3e9daec384941af18a1",
	measurementId: "G-HZMM392ZCP"
  };
  

const app = initializeApp(firebaseConfig)

const db = getDatabase()
const auth = getAuth()
const storage = getStorage()
// //Auth
function createUser(userData, callback) {
	createUserWithEmailAndPassword(auth, userData.email, userData.password)
		.then(cred => {
			alert('Saytga muvaffaqqiyatli kirdingiz!')
			const userData2 = { ...userData }
			userData2.uid = cred.user.uid
			userData2.password = ''
			userData2['role'] = 'user'
			addUser(userData2, callback)
		})
		.catch(e => {})
}
function signOutUser(callback = () => {}) {
	signOut(auth)
		.then(() => {
			callback(true)
			window.location.reload(true)
			console.log('user Chiqib ketti')
		})
		.catch(() => {
			callback(false)
			console.log('user chiqib keta olmadi')
		})
}

function signIn(dataUser, callback) {
	signInWithEmailAndPassword(auth, dataUser.email, dataUser.password)
		.then(cred => {
			getUserData(cred.user.uid, callback)
		})
		.catch(() => {
			alert('parol yoki email xato')
		})
}

const isSignIn = (callback = () => {}) => {
	console.log('sign in boshlandi')
	onAuthStateChanged(auth, user => {
		if (user) {
			console.log('sign in bulgan')
			getUserData(user.uid, callback)
		} else {
			console.warn('no sign in')
		}
	})
}

//User Functions
function addUser(userData, callback) {
	set(ref(db, 'users/' + userData.uid), userData)
		.then(() => {
			getUserData(userData.uid, callback)
		})
		.catch(err => console.log(err))
}

function setUserData(data, uid) {
	set(ref(db, `users/${uid}`), data)
		.then(() => {})
		.catch(err => console.log(err))
}

const userKirdi = (role, callback) => {
	switch (role) {
		case 'superAdmin':
			getUsers(callback)
		case 'admin':
			getOrders(callback)
			break
		case 'yetkazuvchi':
			getOrders(callback)
			break
		case 'user':
			break
	}
}
function getUserData(uid, callback) {
	onValue(ref(db, `users/${uid}`), data => {
		callback({ type: 'USER_DATA', payload: data.val() || {} })
		userKirdi(data.val().role || 'user', callback)
	})
}

function getUsers(callback) {
	onValue(ref(db, `users/`), data => {
		callback({ type: 'GET_USERS', payload: data.val() || {} })
	})
}

// Products

// Get functions
function getCategories(callback) {
	onValue(ref(db, `categories/`), data => {
		callback({
			type: 'GET_CATEGORIES',
			payload: Object.values(data.val() || {}),
		})
	})
}
function getProducts(callback) {
	onValue(ref(db, `products/`), data => {
		callback({ type: 'GET_PRODUCTS', payload: data.val() || {} })
	})
}

function getOrders(callback) {
	onValue(ref(db, `orders/`), data => {
		callback({ type: 'GET_ORDERS', payload: data.val() || {} })
	})
}

// Push functioins
const pushCategory = category => {
	push(ref(db, `categories`), category)
		.then(() => {})
		.catch(err => console.log(err))
}

function uploadDoctorImage(file, bucketName = 'doctorImages') {
	return new Promise((resolve, reject) => {
		if (!file || !file.name) {
			return reject('Invalid file')
		}
		const newFileName = `${file.name.split('.')[0]}.picture`

		const storage = getStorage()
		const fileRef = RefStorage(storage, `${bucketName}/${newFileName}`)

		uploadBytes(fileRef, file)
			.then(snapshot => {
				console.log('Uploaded a blob or file!')
				return getDownloadURL(snapshot.ref)
			})
			.then(downloadURL => {
				console.log('File available at', downloadURL)
				resolve(downloadURL)
			})
			.catch(error => {
				console.error('Error uploading file:', error)
				reject(error)
			})
	})
}

function pushProduct(category, data) {
	push(ref(db, `products/${category}/`), data)
		.then(() => {
			console.log('Successfully added')
		})
		.catch(error => console.error(error))
}

function pushOrder(data) {
	push(ref(db, `orders/`), data)
		.then(() => {})
		.catch(err => console.warn(err))
}

function pushProductToKorzina(data, uid) {
	push(ref(db, `users/${uid}/korzina`), data)
		.then(() => {})
		.catch(err => console.warn(err))
}

const clearKorzina = uid => {
	set(ref(db, `users/${uid}/korzina`), {})
		.then()
		.catch(err => console.log(err))
}
// SEt functions
const setKorzinaProduct = (data, id, uid) => {
	set(ref(db, `users/${uid}/korzina/${id}`), data)
		.then(() => {})
		.catch(err => console.log(err))
}

//
function doneOrder(orderId, data, worker) {
	console.log('edite done', data)
	const data2 = { ...data }
	if (worker) {
		data2['done'] = !data2['done']
		data2.worker = worker
	}

	console.log('edite done', data2)
	set(ref(db, `orders/${orderId}`), data2)
		.then(() => {})
		.catch(err => console.log(err))
}

export {
	clearKorzina,
	createUser,
	doneOrder,
	getCategories,
	getOrders,
	getProducts,
	isSignIn,
	pushCategory,
	pushOrder,
	pushProduct,
	pushProductToKorzina,
	setKorzinaProduct,
	setUserData,
	signIn,
	signOutUser,
	uploadDoctorImage,
}
