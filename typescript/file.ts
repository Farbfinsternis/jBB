namespace jBB{
	export class jFile{
		private db:IDBDatabase;
		private filename:string;
		private stringCursor:number;
		private content:string;
		private objectStore:IDBObjectStore;

		constructor(filename:string){
			this.filename = filename;
			var request = window.indexedDB.open('jBBIDB', 1);
			request.onsuccess = this._onDBOpenSuccess;
			request.onerror = this._onDBOpenError;
			request.onupgradeneeded = this._onDBUpgradeNeeded;
		}

		private _onDBOpenSuccess = (evt) => {
			this.db = evt.target.result;
			var val = this.db.transaction([this.filename], 'readwrite').objectStore(this.filename).get(1);
			val.onsuccess = () => { this.content = val.result.content; }
			val.onerror = () => {
				// wenn die Datei noch nicht existiert soll sie angelegt werden
				var newFile = this.db.transaction([this.filename], 'readwrite').objectStore(this.filename).put({ 'id' : 1, 'content' : '' });
				this.content = '';
			}
		}
		
		private _onDBUpgradeNeeded = (evt) => {
			this.db = evt.target.result;
			if(!this.db.objectStoreNames.contains(this.filename)){ this.objectStore = this.db.createObjectStore(this.filename, { keyPath : 'id' }); }
		}

		private _onDBOpenError = (evt) => { console.log(evt.target.errorCode); }

		public writeString = (value:string) => {

		}

		public readString = () => {
			var result:string = null;
			return result;
		}
	}
}